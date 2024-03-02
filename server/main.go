package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
)

type User struct {
	Username string `json:"username"`
	Points   int    `json:"points"`
}

type Defuse struct {
	Username string `json:"username"`
	Count    int    `json:"counts"`
}

func main() {
	// Create a context
	ctx := context.Background()
	// Create a new HTTP mux
	mux := http.NewServeMux()

	// Create a Redis client instance
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis-14173.c326.us-east-1-3.ec2.cloud.redislabs.com:14173", // Redis server address
		Password: "vwbEqbiQdkXotxmnaZbJbCBtKy7R2GjZ",                           // No password set
		DB:       0,                                                            // Use the default database
	})

	// Test the connection to Redis
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		fmt.Println("Error connecting to Redis:", err)
		return
	}
	fmt.Println("Connected to Redis")

	mux.HandleFunc("/addpoint", func(w http.ResponseWriter, r *http.Request) {
		// Decode the JSON data from the request body into a User struct
		var user User
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			fmt.Println("Error decoding JSON:", err)
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}

		// Save user points to Redis
		err = rdb.HSet(ctx, "user_points", user.Username, user.Points).Err()
		if err != nil {
			fmt.Println("Error saving user points to Redis:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Write a success response
		fmt.Fprintf(w, "User points for %s updated successfully: %d", user.Username, user.Points)
	})

	mux.HandleFunc("/getusers", func(w http.ResponseWriter, r *http.Request) {
		// Fetch all users and their points from Redis
		usersPoints, err := rdb.HGetAll(ctx, "user_points").Result()
		if err != nil {
			fmt.Println("Error fetching users points from Redis:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Convert the map of string to string into map of string to int
		usersPointsInt := make(map[string]int)
		for username, pointsStr := range usersPoints {
			points, err := strconv.Atoi(pointsStr)
			if err != nil {
				fmt.Println("Error converting points to integer:", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			usersPointsInt[username] = points
		}

		// Encode the map into JSON
		jsonResponse, err := json.Marshal(usersPointsInt)
		if err != nil {
			fmt.Println("Error encoding JSON:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Set the Content-Type header to application/json
		w.Header().Set("Content-Type", "application/json")

		// Write the JSON response
		w.Write(jsonResponse)
	})

	mux.HandleFunc("/findPointsByUsername", func(w http.ResponseWriter, r *http.Request) {
		// Decode the JSON data from the request body into a struct
		var requestData struct {
			Username string `json:"username"`
		}
		if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Check if username is provided
		if requestData.Username == "" {
			http.Error(w, "username parameter is required", http.StatusBadRequest)
			return
		}

		// Get user points from Redis hash
		userPoints, err := rdb.HGet(ctx, "user_points", requestData.Username).Result()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Parse user points
		points, err := strconv.Atoi(userPoints)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Create a response JSON object
		response := map[string]int{requestData.Username: points}

		// Encode response JSON object and send response
		json.NewEncoder(w).Encode(response)
	})

	mux.HandleFunc("/defuse", func(w http.ResponseWriter, r *http.Request) {
		// Decode the JSON data from the request body into a Defuse struct
		var defuse Defuse
		err := json.NewDecoder(r.Body).Decode(&defuse)
		if err != nil {
			fmt.Println("Error decoding JSON:", err)
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}

		// Save defuse count to Redis under a different key
		err = rdb.HSet(ctx, "defuse_count", defuse.Username, defuse.Count).Err()
		if err != nil {
			fmt.Println("Error saving defuse count to Redis:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Write a success response
		fmt.Fprintf(w, "Defuse count for %s added successfully: %d", defuse.Username, defuse.Count)
	})

	// Define the HTTP handler function for the "/getDefusers" endpoint
	mux.HandleFunc("/getDefusers", func(w http.ResponseWriter, r *http.Request) {
		// Fetch all defusers and their defuse counts from Redis
		defusersCounts, err := rdb.HGetAll(ctx, "defuse_count").Result()
		if err != nil {
			fmt.Println("Error fetching defusers counts from Redis:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Convert the map of string to string into map of string to int
		defusersCountsInt := make(map[string]int)
		for username, countStr := range defusersCounts {
			count, err := strconv.Atoi(countStr)
			if err != nil {
				fmt.Println("Error converting count to integer:", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			defusersCountsInt[username] = count
		}

		// Encode the map into JSON
		jsonResponse, err := json.Marshal(defusersCountsInt)
		if err != nil {
			fmt.Println("Error encoding JSON:", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Set the Content-Type header to application/json
		w.Header().Set("Content-Type", "application/json")

		// Write the JSON response
		w.Write(jsonResponse)
	})

	// Create a CORS handler
	corsHandler := cors.Default().Handler(mux)

	// Start the HTTP server on port 8080 with the CORS-enabled handler
	fmt.Println("Server is listening on port 8080...")
	err = http.ListenAndServe(":8080", corsHandler)
	if err != nil {
		fmt.Println("Error starting HTTP server:", err)
	}
}

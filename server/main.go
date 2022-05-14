package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type restaurant struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Address      string  `json:"address"`
	Rating       float32 `json:"rating"`
	ThumbnailUrl string  `json:"thumbnail_url"`
}

type restaurantOpening struct {
	Restaurant restaurant `json:"restaurant"`
	Openings   openings   `json:"openings"`
}

type openings struct {
	Mon openingRange `json:"mon"`
	Tue openingRange `json:"tue"`
	Wed openingRange `json:"wed"`
	Thu openingRange `json:"thu"`
	Fri openingRange `json:"fri"`
	Sat openingRange `json:"sat"`
	Sun openingRange `json:"sun"`
}

type openingRange struct {
	Start uint32 `json:"start"`
	End   uint32 `json:"end"`
}

var restaurants = []restaurant{
	{ID: "1", Name: "Ego Mediterranean Restaurant & Bar, Sheffield", Address: "88 Surrey St, Sheffield City Centre, Sheffield S1 2LH, United Kingdom", Rating: 4.5, ThumbnailUrl: "/ego_thumb.jpg"},
	{ID: "2", Name: "Grazie", Address: "1-3 Leopold St, Sheffield City Centre, Sheffield S1 2GY, United Kingdom", Rating: 4.8, ThumbnailUrl: "/grazie_thumb.jpg"},
	{ID: "3", Name: "Domo Restaurant", Address: "Eagle Works, 34-36 Cotton Mill Walk, Little Kelham St, Sheffield S3 8DH, United Kingdom", Rating: 4.7, ThumbnailUrl: "/domo_thumb.jpg"},
	{ID: "4", Name: "Marmaris Turkish Restaurant", Address: "276-278 London Rd, Highfield, Sheffield S2 4NA, United Kingdom", Rating: 4.7, ThumbnailUrl: "/marmaris_thumb.jpg"},
	{ID: "5", Name: "VeroGusto", Address: "12 Norfolk Row, Sheffield City Centre, Sheffield S1 2PA, United Kingdom", Rating: 4.7, ThumbnailUrl: "/gusto_thumb.jpg"},
}

var openingMap = map[string]restaurantOpening{
	"1": {
		Restaurant: restaurants[0],
		Openings: openings{
			Mon: openingRange{
				Start: 39600,
				End:   82800,
			},
			Tue: openingRange{
				Start: 39600,
				End:   82800,
			},
			Wed: openingRange{
				Start: 39600,
				End:   82800,
			},
			Thu: openingRange{
				Start: 39600,
				End:   82800,
			},
			Fri: openingRange{
				Start: 39600,
				End:   82800,
			},
			Sat: openingRange{
				Start: 39600,
				End:   82800,
			},
			Sun: openingRange{
				Start: 39600,
				End:   82800,
			},
		},
	},
	"2": {
		Restaurant: restaurants[1],
		Openings: openings{
			Mon: openingRange{
				Start: 43200,
				End:   76680,
			},
			Tue: openingRange{
				Start: 43200,
				End:   76680,
			},
			Wed: openingRange{
				Start: 43200,
				End:   76680,
			},
			Thu: openingRange{
				Start: 43200,
				End:   76680,
			},
			Fri: openingRange{
				Start: 43200,
				End:   76680,
			},
			Sat: openingRange{
				Start: 43200,
				End:   79200,
			},
		},
	},
	"3": {
		Restaurant: restaurants[2],
		Openings: openings{
			Mon: openingRange{
				Start: 43200,
				End:   75600,
			},
			Tue: openingRange{
				Start: 43200,
				End:   75600,
			},
			Wed: openingRange{
				Start: 43200,
				End:   75600,
			},
			Thu: openingRange{
				Start: 43200,
				End:   75600,
			},
			Fri: openingRange{
				Start: 54000,
				End:   79200,
			},
			Sat: openingRange{
				Start: 36000,
				End:   79200,
			},
			Sun: openingRange{
				Start: 36000,
				End:   72000,
			},
		},
	},
	"4": {
		Restaurant: restaurants[3],
		Openings: openings{
			Mon: openingRange{
				Start: 43200,
				End:   82800,
			},
			Tue: openingRange{
				Start: 43200,
				End:   82800,
			},
			Wed: openingRange{
				Start: 43200,
				End:   82800,
			},
			Thu: openingRange{
				Start: 43200,
				End:   82800,
			},
			Fri: openingRange{
				Start: 54000,
				End:   79200,
			},
			Sat: openingRange{
				Start: 36000,
				End:   79200,
			},
			Sun: openingRange{
				Start: 36000,
				End:   72000,
			},
		},
	},
	"5": {
		Restaurant: restaurants[4],
		Openings: openings{
			Mon: openingRange{
				Start: 43200,
				End:   82800,
			},
			Tue: openingRange{
				Start: 43200,
				End:   82800,
			},
			Wed: openingRange{
				Start: 43200,
				End:   82800,
			},
			Thu: openingRange{
				Start: 43200,
				End:   82800,
			},
			Fri: openingRange{
				Start: 54000,
				End:   79200,
			},
			Sat: openingRange{
				Start: 36000,
				End:   79200,
			},
			Sun: openingRange{
				Start: 36000,
				End:   72000,
			},
		},
	},
}

func main() {
	router := gin.Default()
	router.Use(cors())

	router.GET("/restaurants", getRestaurants)
	router.POST("/restaurants", postRestaurants)
	router.GET("/openings", getOpenings)
	router.POST("/openings", postOpenings)
	router.GET("/openings/:id", getRestaurantOpeningsById)

	router.Run("localhost:8080")
}

/* MIDDLEWARES */
func cors() gin.HandlerFunc {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")

	if allowedOrigin == "" {
		allowedOrigin = "*"
	}

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

/* ROUTE FUNCTIONS */
func getRestaurants(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, restaurants)
}

func postRestaurants(c *gin.Context) {
	var newRestaurant restaurant

	if err := c.BindJSON(&newRestaurant); err != nil {
		return
	}

	newRestaurant.ID = fmt.Sprint(len(restaurants) + 1)

	restaurants = append(restaurants, newRestaurant)
	c.IndentedJSON(http.StatusCreated, newRestaurant)
}

func getOpenings(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, openingMap)
}

func postOpenings(c *gin.Context) {
	var newOpenings restaurantOpening

	if err := c.BindJSON(&newOpenings); err != nil {
		return
	}

	for _, restaurant := range restaurants {
		if restaurant.ID == newOpenings.Restaurant.ID {
			openingMap[restaurant.ID] = newOpenings
			c.IndentedJSON(http.StatusOK, newOpenings)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "restaurant not found to add openings"})
}

func getRestaurantOpeningsById(c *gin.Context) {
	id := c.Param("id")

	opening, ok := openingMap[id]

	if ok {
		c.IndentedJSON(http.StatusOK, opening)
		return
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "restaurant's openings not found"})
}

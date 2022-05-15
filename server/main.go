package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"besimgurbuz.dev/lw-practice/db"
	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg"
	"github.com/joho/godotenv"
)

var dbConn *pg.DB

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("error loading .env file")
	}

	dbConn = db.Connect()
	db.CreateTablesIfNotExists(dbConn)
	db.InsertDefaultValues(dbConn)
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
	log.Printf("allowed origin: %v", allowedOrigin)

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
	c.IndentedJSON(http.StatusOK, db.GetAllRestaurants(dbConn))
}

func postRestaurants(c *gin.Context) {
	var newRestaurant db.Restaurant

	if err := c.BindJSON(&newRestaurant); err != nil {
		return
	}

	saved, err := newRestaurant.SaveRestaurant(dbConn)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "unvalid restaurant"})
		return
	}

	c.IndentedJSON(http.StatusCreated, saved)
}

func getOpenings(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, db.GetAllOpenings(dbConn))
}

func postOpenings(c *gin.Context) {
	var newOpenings db.Opening

	if err := c.BindJSON(&newOpenings); err != nil {
		return
	}

	for _, restaurant := range *db.GetAllRestaurants(dbConn) {
		if restaurant.ID == newOpenings.RestaurantID {
			newOpenings.SaveOpening(dbConn)
			c.IndentedJSON(http.StatusOK, newOpenings)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "restaurant not found to add openings"})
}

func getRestaurantOpeningsById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "restaurant id must be integer"})
	}

	opening, err := db.GetOpeningByRestaurantId(dbConn, id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "restaurant's openings not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, opening)
}

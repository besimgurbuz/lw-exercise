package db

import (
	"log"
	"os"

	pg "github.com/go-pg/pg"
)

/*
	Stars connection to database
*/
func Connect() *pg.DB {
	opts := &pg.Options{
		User:     os.Getenv("DB_USERNAME"),
		Password: os.Getenv("DB_PASSWORD"),
		Addr:     os.Getenv("DB_ADDRESS"),
	}
	var db = pg.Connect(opts)

	if db == nil {
		log.Println("failed to connect to database.")
	}
	log.Println("connection to database successful.")

	return db
}

/*
	Creates tables that not exists
*/
func CreateTablesIfNotExists(db *pg.DB) {
	CreateRestaurantTable(db)
	CreateOpeningTable(db)
}

/*
	Insert some default values into tables
*/
func InsertDefaultValues(db *pg.DB) {
	var restaurants = []Restaurant{
		{Name: "Ego Mediterranean Restaurant & Bar, Sheffield", Address: "88 Surrey St, Sheffield City Centre, Sheffield S1 2LH, United Kingdom", Rating: 4.5, ThumbnailUrl: "/ego_thumb.jpg"},
		{Name: "Grazie", Address: "1-3 Leopold St, Sheffield City Centre, Sheffield S1 2GY, United Kingdom", Rating: 4.8, ThumbnailUrl: "/grazie_thumb.jpg"},
		{Name: "Domo Restaurant", Address: "Eagle Works, 34-36 Cotton Mill Walk, Little Kelham St, Sheffield S3 8DH, United Kingdom", Rating: 4.7, ThumbnailUrl: "/domo_thumb.jpg"},
		{Name: "Marmaris Turkish Restaurant", Address: "276-278 London Rd, Highfield, Sheffield S2 4NA, United Kingdom", Rating: 4.7, ThumbnailUrl: "/marmaris_thumb.jpg"},
		{Name: "VeroGusto", Address: "12 Norfolk Row, Sheffield City Centre, Sheffield S1 2PA, United Kingdom", Rating: 4.7, ThumbnailUrl: "/gusto_thumb.jpg"},
	}

	for _, restaurant := range restaurants {
		restaurant.SaveRestaurant(db)
	}

	var openings = []Opening{
		{
			RestaurantID:   1,
			RestaurantName: "Ego Mediterranean Restaurant & Bar, Sheffield",
			Openings: WeeklyOpening{
				Mon: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Tue: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Wed: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Thu: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Fri: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Sat: OpeningRange{
					Start: 39600,
					End:   82800,
				},
				Sun: OpeningRange{
					Start: 39600,
					End:   82800,
				},
			}},
		{
			RestaurantID:   2,
			RestaurantName: restaurants[1].Name,
			Openings: WeeklyOpening{
				Mon: OpeningRange{
					Start: 43200,
					End:   76680,
				},
				Tue: OpeningRange{
					Start: 43200,
					End:   76680,
				},
				Wed: OpeningRange{
					Start: 43200,
					End:   76680,
				},
				Thu: OpeningRange{
					Start: 43200,
					End:   76680,
				},
				Fri: OpeningRange{
					Start: 43200,
					End:   76680,
				},
				Sat: OpeningRange{
					Start: 43200,
					End:   79200,
				},
			},
		},
		{
			RestaurantID:   3,
			RestaurantName: restaurants[2].Name,
			Openings: WeeklyOpening{
				Mon: OpeningRange{
					Start: 43200,
					End:   75600,
				},
				Tue: OpeningRange{
					Start: 43200,
					End:   75600,
				},
				Wed: OpeningRange{
					Start: 43200,
					End:   75600,
				},
				Thu: OpeningRange{
					Start: 43200,
					End:   75600,
				},
				Fri: OpeningRange{
					Start: 54000,
					End:   79200,
				},
				Sat: OpeningRange{
					Start: 36000,
					End:   79200,
				},
				Sun: OpeningRange{
					Start: 36000,
					End:   72000,
				},
			},
		},
		{
			RestaurantID:   4,
			RestaurantName: restaurants[3].Name,
			Openings: WeeklyOpening{
				Mon: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Tue: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Wed: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Thu: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Fri: OpeningRange{
					Start: 54000,
					End:   79200,
				},
				Sat: OpeningRange{
					Start: 36000,
					End:   79200,
				},
				Sun: OpeningRange{
					Start: 36000,
					End:   72000,
				},
			},
		},
		{
			RestaurantID:   5,
			RestaurantName: restaurants[4].Name,
			Openings: WeeklyOpening{
				Mon: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Tue: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Wed: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Thu: OpeningRange{
					Start: 43200,
					End:   82800,
				},
				Fri: OpeningRange{
					Start: 54000,
					End:   79200,
				},
				Sat: OpeningRange{
					Start: 36000,
					End:   79200,
				},
				Sun: OpeningRange{
					Start: 36000,
					End:   72000,
				},
			},
		},
	}

	for _, opening := range openings {
		opening.SaveOpening(db)
	}
}

/*
	Disconnects from database
*/
func Disconnect(db *pg.DB) {
	if db == nil {
		log.Println("connection not found to close.")
		return
	}

	closeErr := db.Close()
	if closeErr != nil {
		log.Printf("error while closing the connection:  %v\n", closeErr)
	}
	log.Println("connection closed successfully.")
}

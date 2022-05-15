package db

import (
	"log"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

/*
	Restaurant model
*/
type Restaurant struct {
	ID           int     `json:"id" sql:"id,pk"`
	Name         string  `json:"name" sql:"name,notnull,unique"`
	Address      string  `json:"address" sql:"address,notnull"`
	Rating       float32 `json:"rating" sql:"rating,notnull,type:real"`
	ThumbnailUrl string  `json:"thumbnail_url" sql:"thumbnail_url"`
}

func (restaurant *Restaurant) SaveRestaurant(db *pg.DB) (*Restaurant, error) {
	_, insertErr := db.Model(restaurant).Insert()
	if insertErr != nil {
		log.Printf("error while inserting new item into restaurants: %v", insertErr)
		return nil, insertErr
	}
	log.Printf("restaurant %s inserted successfully\n", restaurant.Name)
	return restaurant, nil
}

func GetAllRestaurants(db *pg.DB) *[]Restaurant {
	var restaurants []Restaurant
	err := db.Model(&restaurants).Select()

	if err != nil {
		log.Printf("error while listing all restaurants: %v\n", err)
		return &[]Restaurant{}
	}
	return &restaurants
}

func CreateRestaurantTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createErr := db.CreateTable(&Restaurant{}, opts)

	if createErr != nil {
		log.Printf("error while creating restaurants table: %v", createErr)
		return createErr
	}
	log.Printf("table restaurants created successfully.")
	return nil
}

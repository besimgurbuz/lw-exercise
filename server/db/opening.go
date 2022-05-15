package db

import (
	"log"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

/*
	Opening model
*/
type Opening struct {
	RestaurantID   int           `json:"restaurant_id" sql:"restaurant_id,unique"`
	RestaurantName string        `json:"restaurant_name" sql:"restaurant_name,notnull"`
	Openings       WeeklyOpening `json:"openings" sql:"openings"`
}

type WeeklyOpening struct {
	Mon OpeningRange `json:"mon" sql:"mon"`
	Tue OpeningRange `json:"tue" sql:"tue"`
	Wed OpeningRange `json:"wed" sql:"wed"`
	Thu OpeningRange `json:"thu" sql:"thu"`
	Fri OpeningRange `json:"fri" sql:"fri"`
	Sat OpeningRange `json:"sat" sql:"sat"`
	Sun OpeningRange `json:"sun" sql:"sun"`
}

type OpeningRange struct {
	Start uint32 `json:"start" sql:"start"`
	End   uint32 `json:"end" sql:"end"`
}

func (opening *Opening) SaveOpening(db *pg.DB) (*Opening, error) {
	_, insertErr := db.Model(opening).Insert()

	if insertErr != nil {
		log.Printf("error while inserting new intem into openings: %v", insertErr)
		return nil, insertErr
	}
	log.Printf("opening of %s inserted successfully\n", opening.RestaurantName)
	return opening, nil
}

func GetAllOpenings(db *pg.DB) *[]Opening {
	var openings []Opening
	err := db.Model(&openings).Select()

	if err != nil {
		log.Printf("error while geting all openings: %v", err)
		return &[]Opening{}
	}

	return &openings
}

func GetOpeningByRestaurantId(db *pg.DB, restaurantId int) (*Opening, error) {
	var opening Opening
	err := db.Model(&opening).Where("restaurant_id = ?", restaurantId).Select()

	if err != nil {
		log.Printf("error while geting openings for restaurant with id: %v, error: %v", restaurantId, err)
		return nil, err
	}

	return &opening, nil
}

func CreateOpeningTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists: true,
	}
	createErr := db.CreateTable(&Opening{}, opts)

	if createErr != nil {
		log.Printf("error while creating openings table: %v", createErr)
		return createErr
	}
	log.Printf("table openings created successfully.")
	return nil
}

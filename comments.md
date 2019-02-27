# CR1

## README

	- Name/description (Stickr)
	- Link deployed app
	- Instructions for running locally

## Workflow

	- Semantic commit msgs
	- 3 parts
		* Type of commit: (feature, fix, doc, testing, etc)
		* Area of commit coverage (API, Redux, Models, Front-end)
		* Present-tense description of what commit covers

## Schema Design

	- User one-to-many Order
	- Order many-to-many Product
	```
		id  o_id	p_id	Price_Order. quant
		1.   1.      2.       50      3
		2.   1.      3.       75      2
		3.   2.      2        25      100
		4.   3.      2,       100     35
	```
	- Cart, is property of Order

## API

	- Stick to vertical slices
	- Using semantic HTTP stati
		- GET 200
		- POST 201
		- DEL 204
		- PUT 202, 204 if successful but nothing changed


## Front-end

	- Keep all form state in a React Component
	- Redux: Cart, Auth status (including User info)
// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;
class Neighborhood {
	constructor(name){
		this.name = name;
		this.id = ++neighborhoodId;
		store.neighborhoods.push(this);
	}
	deliveries(){
		return store.deliveries.filter(function(delivery) {return delivery.neighborhoodId === this.id}.bind(this));
		}
		customers(){
			return store.customers.filter(function(customer) {return customer.neighborhoodId === this.id}.bind(this));
		}
		meals(){
			let neighborhoodMeals = this.deliveries().map(delivery => delivery.meal());
		return neighborhoodMeals.filter(function(meal,ind,listOfMeals){
			return listOfMeals.indexOf(meal) === ind;
		});


		}
		
	}




class Customer {
	constructor(name, neighborhoodId){
		this.name = name;
		this.neighborhoodId = neighborhoodId;
		this.id = ++customerId;
		
		store.customers.push(this);
	}
	deliveries(){
		return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this));
	}
	meals(){
		return this.deliveries().map(delivery => delivery.meal());
	}
	totalSpent(){
		return this.meals().reduce(function (money, meal){
			return money + meal.price;
		}, 0);
	}



}

class Meal {
	constructor(title,price){
		this.title = title;
		this.price = price;
		this.id = ++mealId;
		store.meals.push(this);
	}
	deliveries(){
		return store.deliveries.filter(delivery => delivery.mealId === this.id);
	}
	customers(){
		return this.deliveries().map(delivery => delivery.customer());
	}
	static byPrice(){
		return store.meals.sort((firstMeal, secondMeal)=> secondMeal.price - firstMeal.price);
		
	}


}
class Delivery {
	constructor(mealId,neighborhoodId, customerId){
		this.mealId = mealId;
		this.customerId = customerId;
		this.neighborhoodId = neighborhoodId;
		this.id = ++deliveryId;
		store.deliveries.push(this);

	}
	meal(){
		return store.meals.find(meal => meal.id === this.mealId);
	}
	customer(){
		return store.customers.find(customer => customer.id === this.customerId);
	}
   neighborhood(){
   	return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);

	}



}





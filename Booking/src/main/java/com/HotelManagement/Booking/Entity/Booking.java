package com.HotelManagement.Booking.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Booking {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String user;
	@Column(nullable = false)
	private String owner;
	@Column(nullable = false)
	private String hotelname;
	@Column(nullable = false)
	private String facility;
	@Column(nullable = false)
	private int price;
	@Column(nullable = false)
	private int noofdays;
	@Column(nullable = false)
	private String checkin;
	@Column(nullable = false)
	private String checkout;
	
	public Booking() {
		super();
	}

	public Booking(int id, String user, String owner, String hotelname, String facility, int price, int noofdays,
			String checkin, String checkout) {
		super();
		this.id = id;
		this.user = user;
		this.owner = owner;
		this.hotelname = hotelname;
		this.facility = facility;
		this.price = price;
		this.noofdays = noofdays;
		this.checkin = checkin;
		this.checkout = checkout;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getHotelname() {
		return hotelname;
	}

	public void setHotelname(String hotelname) {
		this.hotelname = hotelname;
	}

	public String getFacility() {
		return facility;
	}

	public void setFacility(String facility) {
		this.facility = facility;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getNoofdays() {
		return noofdays;
	}

	public void setNoofdays(int noofdays) {
		this.noofdays = noofdays;
	}

	public String getCheckin() {
		return checkin;
	}

	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}

	public String getCheckout() {
		return checkout;
	}

	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", user=" + user + ", owner=" + owner + ", hotelname=" + hotelname + ", facility="
				+ facility + ", price=" + price + ", noofdays=" + noofdays + ", checkin=" + checkin + ", checkout="
				+ checkout + "]";
	}
	
	
	

}

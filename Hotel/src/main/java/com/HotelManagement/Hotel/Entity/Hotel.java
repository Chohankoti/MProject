package com.HotelManagement.Hotel.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Hotel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String owner;
	@Column(nullable = false)
	private String hotelname;
	@Column(nullable = false)
	private String location;
	@Column(nullable = false)
	private boolean status;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private String hotelimage;
	
	public Hotel(int id, String owner, String hotelname, String location, boolean status, String description,
			String hotelimage) {
		super();
		this.id = id;
		this.owner = owner;
		this.hotelname = hotelname;
		this.location = location;
		this.status = status;
		this.description = description;
		this.hotelimage = hotelimage;
	}

	public Hotel() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getHotelimage() {
		return hotelimage;
	}

	public void setHotelimage(String hotelimage) {
		this.hotelimage = hotelimage;
	}
	
	

}

package com.HotelManagement.Facility.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Facility {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String type;
	@Column(nullable = false)
	private String provides;
	@Column(nullable = false)
	private long price;
	
	public Facility(int id, String type, String provides, long price) {
		super();
		this.id = id;
		this.type = type;
		this.provides = provides;
		this.price = price;
	}
	
	public Facility() {
		super();
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getProvides() {
		return provides;
	}
	public void setProvides(String provides) {
		this.provides = provides;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Facility [id=" + id + ", type=" + type + ", provides=" + provides + ", price=" + price + "]";
	}

}

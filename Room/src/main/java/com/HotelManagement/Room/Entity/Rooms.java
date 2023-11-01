package com.HotelManagement.Room.Entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;

@Entity
public class Rooms {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String ownername;
	@Column(nullable = false)
	private String hotelname;
	@Column(nullable = false)
	private String facility;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private String roomimage;
	
	public Rooms(int id, String ownername, String hotelname, String facility, String description, String roomimage) {
		super();
		this.id = id;
		this.ownername = ownername;
		this.hotelname = hotelname;
		this.facility = facility;
		this.description = description;
		this.roomimage = roomimage;
	}

	public Rooms() {
		super();
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOwnername() {
		return ownername;
	}

	public void setOwnername(String ownername) {
		this.ownername = ownername;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRoomimage() {
		return roomimage;
	}

	public void setRoomimage(String roomimage) {
		this.roomimage = roomimage;
	}

	@Override
	public String toString() {
		return "Rooms [id=" + id + ", ownername=" + ownername + ", hotelname=" + hotelname + ", facility=" + facility
				+ ", description=" + description + ", roomimage=" + roomimage + "]";
	}
	    
		

}

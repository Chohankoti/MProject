package com.HotelManagement.AdminMessage.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AdminMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String recipient;
	@Column(nullable = false)
	private String message;
	@Column(nullable = false)
	private String date;
	
	public AdminMessage(int id, String recipient, String message, String date) {
		super();
		this.id = id;
		this.recipient = recipient;
		this.message = message;
		this.date = date;
	}

	public AdminMessage() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "AdminMessage [id=" + id + ", recipient=" + recipient + ", message=" + message + ", date=" + date + "]";
	}

}

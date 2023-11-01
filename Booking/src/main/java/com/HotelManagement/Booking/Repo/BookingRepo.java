package com.HotelManagement.Booking.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.Booking.Entity.Booking;



public interface BookingRepo extends JpaRepository<Booking, Integer>{

}

package com.HotelManagement.Hotel.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.Hotel.Entity.Hotel;


public interface HotelRepo extends JpaRepository<Hotel, Integer> {

}

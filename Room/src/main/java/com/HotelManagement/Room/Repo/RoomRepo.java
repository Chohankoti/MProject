package com.HotelManagement.Room.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.Room.Entity.Rooms;

public interface RoomRepo extends JpaRepository<Rooms, Integer> {

}

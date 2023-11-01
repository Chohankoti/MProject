package com.HotelManagement.Room.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.HotelManagement.Room.Entity.Rooms;
import com.HotelManagement.Room.Repo.RoomRepo;


@RestController
@CrossOrigin("http://localhost:3000")
public class RoomController {
	
	@Autowired
	RoomRepo roomRepo;
	
	@PostMapping("/room")
	public ResponseEntity<Rooms> SaveRoom(@RequestBody Rooms room)
	{
		return new ResponseEntity<>(roomRepo.save(room),HttpStatus.CREATED);
	}
	
	@GetMapping("/room")
	public ResponseEntity<List<Rooms>> GetRooms()
	{
		return new ResponseEntity<>(roomRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/room/{id}")
	public ResponseEntity<Rooms> GetRoomsById(@PathVariable int id)
	{
		Optional<Rooms> room = roomRepo.findById(id);
		
		if(room.isPresent())
		{
			return new ResponseEntity<>(room.get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
	}
	
	@PutMapping("/room/{id}")
	public ResponseEntity<Rooms> UpdateRoom(@PathVariable int id, @RequestBody Rooms rm)
	{
		Optional<Rooms> room = roomRepo.findById(id);
		
		if(room.isPresent())
		{
			room.get().setOwnername(rm.getOwnername());
			room.get().setHotelname(rm.getHotelname());
			room.get().setFacility(rm.getFacility());
			room.get().setDescription(rm.getDescription());
			room.get().setRoomimage(rm.getRoomimage());
			return new ResponseEntity<>(roomRepo.save(room.get()),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("room/{id}")
	public ResponseEntity<Rooms> DeleteRoom(@PathVariable int id)
	{
		Optional<Rooms> room = roomRepo.findById(id);
		
		if(room.isPresent())
		{
			roomRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
	}
	
	

}

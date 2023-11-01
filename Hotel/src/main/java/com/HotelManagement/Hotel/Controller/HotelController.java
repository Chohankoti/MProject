package com.HotelManagement.Hotel.Controller;



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

import com.HotelManagement.Hotel.Entity.Hotel;
import com.HotelManagement.Hotel.Repo.HotelRepo;



@RestController
@CrossOrigin("http://localhost:3000")
public class HotelController {
	
	@Autowired
	HotelRepo hotelRepo;
	
	@PostMapping("/hotels")
	public ResponseEntity<Hotel> SaveHotel(@RequestBody Hotel hotel)
	{
		return new ResponseEntity<>(hotelRepo.save(hotel),HttpStatus.CREATED);
	}
	
	@GetMapping("/hotels")
	public ResponseEntity<List<Hotel>> GetHotel()
	{
		return new ResponseEntity<>(hotelRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/hotels/{id}")
	public ResponseEntity<Hotel> GetHotelById(@PathVariable int id)
	{
		Optional<Hotel> hotel = hotelRepo.findById(id);
		if(hotel.isPresent())
		{
			return new ResponseEntity<>(hotel.get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/hotels/{id}")
	public ResponseEntity<Hotel> UpdateHotel(@PathVariable int id, @RequestBody Hotel htl)
	{
		Optional<Hotel> hotel = hotelRepo.findById(id);
		if(hotel.isPresent())
		{
			hotel.get().setOwner(htl.getOwner());
			hotel.get().setHotelname(htl.getHotelname());
			hotel.get().setLocation(htl.getLocation());
			hotel.get().setDescription(htl.getDescription());
			hotel.get().setStatus(htl.isStatus());
			hotel.get().setHotelimage(htl.getHotelimage());
			return new ResponseEntity<>(hotelRepo.save(hotel.get()),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/hotels/{id}")
	public ResponseEntity<Hotel> DeleteHotel(@PathVariable int id)
	{
		Optional<Hotel> hotel = hotelRepo.findById(id);
		if(hotel.isPresent())
		{
			hotelRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}

package com.HotelManagement.Booking.Controller;



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

import com.HotelManagement.Booking.Entity.Booking;
import com.HotelManagement.Booking.Repo.BookingRepo;



@RestController
@CrossOrigin("http://localhost:3000")
public class BookingController {
	
	@Autowired
	BookingRepo bookingRepo;
	
	@PostMapping("/booking")
	public ResponseEntity<Booking> SaveBooking(@RequestBody Booking booking)
	{
		return new ResponseEntity<>(bookingRepo.save(booking), HttpStatus.CREATED);
	}
	
	@GetMapping("/booking")
	public ResponseEntity<List<Booking>> ViewAllBooking()
	{
		return new ResponseEntity<>(bookingRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/booking/{id}")
	public ResponseEntity<Booking> ViewByIdBooking(@PathVariable int id)
	{
		Optional<Booking> booking = bookingRepo.findById(id);
		System.out.println("checking ID of get:"+id);	
		System.out.println("Check booking data of get:"+booking);
		
		if(booking.isPresent())
		{
			return new ResponseEntity<>(booking.get(), HttpStatus.OK);
		}
		else
		{
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	@PutMapping("/booking/{id}")
	public ResponseEntity<Booking> UpdateBooking(@PathVariable int id,@RequestBody Booking bk)
	{
		Optional<Booking> booking = bookingRepo.findById(id);
		System.out.println("checking ID of update:"+id);	
		System.out.println("Check booking data of update:"+booking);
		if(booking.isPresent())
		{
			booking.get().setUser(bk.getUser());
			booking.get().setOwner(bk.getOwner());
			booking.get().setHotelname(bk.getHotelname());
			booking.get().setFacility(bk.getFacility());
			booking.get().setPrice(bk.getPrice());
			booking.get().setNoofdays(bk.getNoofdays());
			booking.get().setCheckin(bk.getCheckin());
			booking.get().setCheckout(bk.getCheckout());
			
			return new ResponseEntity<>(bookingRepo.save(booking.get()), HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	@DeleteMapping("/booking/{id}")
	public ResponseEntity<Booking> DeleteBooking(@PathVariable int id)
	{
        Optional<Booking> booking = bookingRepo.findById(id);
		
		if(booking.isPresent())
		{
			bookingRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}

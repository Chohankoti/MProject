package com.HotelManagement.Facility.Controller;



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

import com.HotelManagement.Facility.Entity.Facility;
import com.HotelManagement.Facility.Repo.FacilityRepo;



@RestController
@CrossOrigin("http://localhost:3000")
public class FacilityController {
	
	@Autowired
	FacilityRepo facilityRepo;
	
	
	@PostMapping("/facility")
	public ResponseEntity<Facility> SaveFacility(@RequestBody Facility facility)
	{
		return new ResponseEntity<>(facilityRepo.save(facility),HttpStatus.CREATED);
	}
	
	
	@GetMapping("/facility")
	public ResponseEntity<List<Facility>> GetFacility()
	{
		return new ResponseEntity<>(facilityRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/facility/{id}")
	public ResponseEntity<Facility> GetFacilityById(@PathVariable int id)
	{
		Optional<Facility> facility = facilityRepo.findById(id);
		
		if(facility.isPresent())
		{
			return new ResponseEntity<>(facility.get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/facility/{id}")
	public ResponseEntity<Facility> UpdateFacility(@PathVariable int id, @RequestBody Facility fac)
	{
		Optional<Facility> facility = facilityRepo.findById(id);
		
		if(facility.isPresent())
		{
			facility.get().setType(fac.getType());
			facility.get().setProvides(fac.getProvides());
			facility.get().setPrice(fac.getPrice());
			return new ResponseEntity<>(facilityRepo.save(facility.get()),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/facility/{id}")
	public ResponseEntity<Facility> DeleteFacility(@PathVariable int id)
	{
		Optional<Facility> facility = facilityRepo.findById(id);
		
		if(facility.isPresent())
		{
			facilityRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}

package com.HotelManagement.AdminMessage.Controller;



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

import com.HotelManagement.AdminMessage.Entity.AdminMessage;
import com.HotelManagement.AdminMessage.Repo.AdminMessageRepo;



@RestController
@CrossOrigin("http://localhost:3000")
public class AdminMessageController {
	
	@Autowired
	AdminMessageRepo adminMessageRepo;
	
	
	@PostMapping("/adminmessage")
	public ResponseEntity<AdminMessage> savemessage(@RequestBody AdminMessage adminMessage)
	{
		return new ResponseEntity<>(adminMessageRepo.save(adminMessage),HttpStatus.CREATED);
	}
	
	@GetMapping("/adminmessage")
	public ResponseEntity<List<AdminMessage>> viewmessage()
	{
		return new ResponseEntity<>(adminMessageRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/adminmessage/{id}")
	public ResponseEntity<AdminMessage> viewmessagebyid(@PathVariable int id)
	{
		Optional<AdminMessage> adminmessage = adminMessageRepo.findById(id);
		
		if(adminmessage.isPresent())
		{
			return new ResponseEntity<>(adminmessage.get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/adminmessage/{id}")
	public ResponseEntity<AdminMessage> updatemessage(@PathVariable int id, @RequestBody AdminMessage admessage)
	{
		Optional<AdminMessage> adminmessage = adminMessageRepo.findById(id);
		
		if(adminmessage.isPresent())
		{
			adminmessage.get().setRecipient(admessage.getRecipient());
			adminmessage.get().setMessage(admessage.getMessage());
			adminmessage.get().setDate(admessage.getDate());
			return new ResponseEntity<>(adminMessageRepo.save(adminmessage.get()),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/adminmessage/{id}")
	public ResponseEntity<AdminMessage> deletemessage(@PathVariable int id)
	{
		Optional<AdminMessage> adminmessage = adminMessageRepo.findById(id);
		
		if(adminmessage.isPresent())
		{
			adminMessageRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}

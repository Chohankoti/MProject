package com.HotelManagement.User.Controller;



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

import com.HotelManagement.User.Entity.Users;
import com.HotelManagement.User.Repo.UserRepo;






@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	
	@Autowired
	UserRepo userRepo;
	
	
	@PostMapping("/users")
	public ResponseEntity<Users> SaveUser(@RequestBody Users user)
	{
		return new ResponseEntity<>(userRepo.save(user),HttpStatus.CREATED);
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<Users>> GetUsers()
	{
		return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<Users> GetUserById(@PathVariable int id)
	{
		Optional<Users> user = userRepo.findById(id);
		if(user.isPresent())
		{
			return new ResponseEntity<>(user.get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PutMapping("/users/{id}")
	public ResponseEntity<Users> updateuser(@PathVariable int id, @RequestBody Users usr)
	{
		Optional<Users> user = userRepo.findById(id);
		if(user.isPresent())
		{
			user.get().setUsername(usr.getUsername());
			user.get().setFirstname(usr.getFirstname());
			user.get().setLastname(usr.getLastname());
			user.get().setEmail(usr.getEmail());
			user.get().setPhone(usr.getPhone());
			user.get().setGender(usr.getGender());
			user.get().setDob(usr.getDob());
			user.get().setPassword(usr.getPassword());
			user.get().setRole(usr.getRole());
			return new ResponseEntity<>(userRepo.save(user.get()),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

		
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> DeleteUser(@PathVariable int id)
	{
		Optional<Users> user = userRepo.findById(id);
		if(user.isPresent())
		{
			userRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

}

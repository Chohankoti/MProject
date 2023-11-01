package com.HotelManagement.User.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.User.Entity.Users;

public interface UserRepo extends JpaRepository<Users, Integer> {
  
}

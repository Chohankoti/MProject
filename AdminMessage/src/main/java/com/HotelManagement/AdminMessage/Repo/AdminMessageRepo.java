package com.HotelManagement.AdminMessage.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.AdminMessage.Entity.AdminMessage;


public interface AdminMessageRepo extends JpaRepository<AdminMessage, Integer>{

}

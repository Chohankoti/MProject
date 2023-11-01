package com.HotelManagement.Facility.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.HotelManagement.Facility.Entity.Facility;


public interface FacilityRepo extends JpaRepository<Facility, Integer>{

}

package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    // You can define additional query methods if needed
}

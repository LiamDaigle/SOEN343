package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.Profile;
import com.smarthome.smarthomesystem.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByUser(User user);
    // You can define additional query methods if needed
}

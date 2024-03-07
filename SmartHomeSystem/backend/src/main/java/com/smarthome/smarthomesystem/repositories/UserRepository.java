package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}

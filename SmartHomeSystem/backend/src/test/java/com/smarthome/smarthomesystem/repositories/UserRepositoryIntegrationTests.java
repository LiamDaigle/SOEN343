package com.smarthome.smarthomesystem.repositories;

import com.smarthome.smarthomesystem.domain.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static com.smarthome.smarthomesystem.TestDataUtil.*;
import static org.assertj.core.api.Assertions.assertThat;

//This class is mainly here to show how Spring Boot CRUD operations work on Repository Beans

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)    //Cleans DB after each test
public class UserRepositoryIntegrationTests {

    private UserRepository target;

    @Autowired
    public UserRepositoryIntegrationTests(UserRepository target){
        this.target = target;
    }

    @Test
    public void testThatUserCanBeCreatedAndRecalled(){
        User user = createTestUser1();
        target.save(user);
        Optional<User> result = target.findById(user.getId());
        assertThat(result).isPresent(); //Checks it's in the database
        assertThat(result.get()).isEqualTo(user);
    }

    @Test
    public void testThatMultipleUsersCanBeCreatedAndRecalled(){
        User[] users = {createTestUser1(), createTestUser2(), createTestUser3()};
        target.save(users[0]);
        target.save(users[1]);
        target.save(users[2]);
        Iterable<User> result = target.findAll();
        assertThat(result)
                .isNotEmpty()
                .contains(users);
    }

    @Test
    public void testThatUserCanBeUpdated(){
        User user = createTestUser1();
        target.save(user);
        user.setUsername("updated_username");
        target.save(user);
        Optional<User> result = target.findById(user.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(user);
    }

    @Test
    public void testThatUserCanBeDeleted(){
        User user = createTestUser1();
        target.save(user);
        target.delete(user);
        Optional<User> result = target.findById(user.getId());
        assertThat(result).isEmpty();
    }

}

package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.controller.UserController;
import com.smarthome.smarthomesystem.domain.Profile;
import com.smarthome.smarthomesystem.domain.User;
import com.smarthome.smarthomesystem.repositories.ProfileRepository;
import com.smarthome.smarthomesystem.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserControllerTest {
    //Test for the UserController class

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private UserController userController;

    private User testUser;
    private Profile testProfile;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password");

        testProfile = new Profile();
        testProfile.setId(1L);
        testProfile.setName("Test Profile");
        testProfile.setRole("Parent");
        testProfile.setLocation("Living Room");
        testProfile.setUser(testUser);
    }

    @Test
    void testLoginUser_ValidCredentials() {
        //Test that covers whether the user has valid credentials or not
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));
        ResponseEntity<?> responseEntity = userController.loginUser(testUser);
        assertEquals(ResponseEntity.ok(testUser), responseEntity);
    }


    @Test
    void testRegisterUser_Success() {
        //Test that represents a successful registration scenario
        when(userRepository.findByUsername(testUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<?> responseEntity = userController.registerUser(testUser);

        assertEquals(ResponseEntity.ok(testUser), responseEntity);
        verify(userRepository).save(testUser);
    }

    @Test
    void testRegisterUser_UsernameTaken() {
        //Test that represents a non successful registration scenario where the username is already in use
        when(userRepository.findByUsername(testUser.getUsername())).thenReturn(Optional.of(testUser));

        ResponseEntity<?> responseEntity = userController.registerUser(testUser);

        assertEquals(ResponseEntity.badRequest().body("Username or Password is already taken!"), responseEntity);
        verify(userRepository).findByUsername(testUser.getUsername());
    }

    @Test
    void testRegisterUser_EmailTaken() {
        //Test that represents a non successful registration scenario where the email is already in use
        when(userRepository.findByUsername(testUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(testUser.getEmail())).thenReturn(Optional.of(testUser));

        ResponseEntity<?> responseEntity = userController.registerUser(testUser);

        assertEquals(ResponseEntity.badRequest().body("Username or Password is already taken!"), responseEntity);
        verify(userRepository).findByEmail(testUser.getEmail());
    }

    @Test
    void testAddProfileToUser() {
        //Test that sees if it can add a profile to a given user
        when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
        when(profileRepository.save(testProfile)).thenReturn(testProfile);

        ResponseEntity<?> responseEntity = userController.addProfileToUser(testUser.getId(), testProfile);

        assertEquals(ResponseEntity.ok(testProfile), responseEntity);
        verify(profileRepository).save(testProfile);
    }

    @Test
    void testGetUserProfiles() {
        //Test that sees if it can get a certain user
        when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
        when(profileRepository.findByUser(testUser)).thenReturn(Collections.singletonList(testProfile));

        ResponseEntity<List<Profile>> responseEntity = userController.getUserProfiles(testUser.getId());

        assertEquals(ResponseEntity.ok(Collections.singletonList(testProfile)), responseEntity);
        verify(profileRepository).findByUser(testUser);
    }

    @Test
    void testDeleteProfileFromUserByUsername() {
        //Test that sees if it can delte a profile from a user
        when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
        when(profileRepository.findByUser(testUser)).thenReturn(Collections.singletonList(testProfile));

        ResponseEntity<?> responseEntity = userController.deleteProfileFromUserByUsername(testUser.getId(), testProfile.getName());

        assertEquals(ResponseEntity.ok("Profile deleted successfully"), responseEntity);
        verify(profileRepository).delete(testProfile);
    }

    @Test
    void testUpdateProfile() {
        //Test that updates a users profile
        when(userRepository.findById(testUser.getId())).thenReturn(Optional.of(testUser));
        when(profileRepository.findById(testProfile.getId())).thenReturn(Optional.of(testProfile));
        Profile updatedProfile = new Profile();
        updatedProfile.setName("Updated Profile");
        updatedProfile.setRole("Child");
        updatedProfile.setLocation("Kitchen");

        ResponseEntity<?> responseEntity = userController.updateProfile(testUser.getId(), testProfile.getId(), updatedProfile);

        assertEquals(ResponseEntity.ok(testProfile), responseEntity);
        assertEquals(updatedProfile.getName(), testProfile.getName());
        assertEquals(updatedProfile.getRole(), testProfile.getRole());
        assertEquals(updatedProfile.getLocation(), testProfile.getLocation());
        verify(profileRepository).save(testProfile);
    }
}

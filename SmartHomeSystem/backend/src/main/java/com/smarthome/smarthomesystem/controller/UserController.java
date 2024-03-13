package com.smarthome.smarthomesystem.controller;

import com.smarthome.smarthomesystem.domain.User;
import com.smarthome.smarthomesystem.repositories.ProfileRepository;
import com.smarthome.smarthomesystem.repositories.UserRepository;
import org.modelmapper.internal.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smarthome.smarthomesystem.domain.Profile;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() || userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Username or Password is already taken!");
        }

        // Create initial profile for the parent with the same role
        Profile parentProfile = Profile.builder()
                .name(user.getUsername())
                .role("Parent")
                .user(user)
                .location("Entrance")
                .build();
        user.setProfiles(Collections.singletonList(parentProfile));

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{userId}/profiles")
    public ResponseEntity<?> addProfileToUser(@PathVariable Long userId, @RequestBody Profile profile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        profile.setUser(user);
        profileRepository.save(profile);

        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{userId}/profiles")
    public ResponseEntity<List<Profile>> getUserProfiles(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Profile> profiles = profileRepository.findByUser(user);
        return ResponseEntity.ok(profiles);
    }

    @DeleteMapping("/{userId}/profiles/{username}")
    public ResponseEntity<?> deleteProfileFromUserByUsername(@PathVariable Long userId, @PathVariable String username) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Profile> profiles = profileRepository.findByUser(user);
        Profile profileToDelete = profiles.stream()
                .filter(profile -> profile.getName().equals(username))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Profile not found for the given username"));

        profileRepository.delete(profileToDelete);
        return ResponseEntity.ok("Profile deleted successfully");
    }

    @PutMapping("/{userId}/profiles/{profileId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @PathVariable Long profileId, @RequestBody Profile updatedProfile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Retrieve the profile to update
        Profile profileToUpdate = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Check if the profile belongs to the user
        if (!profileToUpdate.getUser().equals(user)) {
            return ResponseEntity.badRequest().body("Profile does not belong to the user");
        }

        // Update the profile details
        profileToUpdate.setName(updatedProfile.getName());
        profileToUpdate.setRole(updatedProfile.getRole());
        profileToUpdate.setLocation(updatedProfile.getLocation());
        profileRepository.save(profileToUpdate);

        return ResponseEntity.ok(profileToUpdate);
    }

    @PatchMapping("/{userId}/profiles/{profileId}")
    public ResponseEntity<?> updateProfileLocation(@PathVariable Long userId, @PathVariable Long profileId, @RequestBody String location) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Retrieve the profile to update
        Profile profileToUpdate = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Check if the profile belongs to the user
        if (!profileToUpdate.getUser().equals(user)) {
            return ResponseEntity.badRequest().body("Profile does not belong to the user");
        }

        // Update the profile location
        profileToUpdate.setLocation(location);
        System.out.print(location);
        profileRepository.save(profileToUpdate);

        return ResponseEntity.ok(profileToUpdate);
    }

}
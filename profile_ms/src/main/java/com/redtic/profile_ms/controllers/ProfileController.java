package com.redtic.profile_ms.controllers;

import com.redtic.profile_ms.models.Profile;
import com.redtic.profile_ms.exceptions.ProfileNotFoundException;
import com.redtic.profile_ms.repositories.ProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class ProfileController {

    private final ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping("/profiles/{username}")
    Profile getProfile(@PathVariable String username) {
        return profileRepository.findById(username)
                .orElseThrow(() -> new ProfileNotFoundException("No se " +
                        "encontro un perfil con el username: " + username));
    }

    @PostMapping("/profiles")
    Profile newProfile(@RequestBody Profile profile){
        Profile profileVerify = profileRepository.findById(profile.getUsername()).orElse(null);
        if (profileVerify != null) {
            //El nombre de usuario no está disponible
            throw new ProfileNotFoundException("El nombre de usuario " + profile.getUsername() + " no está disponible.");
        }
        return profileRepository.save(profile);
    }

    @GetMapping("/profiles/all")
    List <Profile> getAllProfiles(){
        return profileRepository.findAll();
    }
}
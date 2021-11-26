package com.redtic.profile_ms.repositories;

import com.redtic.profile_ms.models.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProfileRepository extends MongoRepository<Profile, String>{
    List<Profile> findByUsername (String username);
    List<Profile> findAll();
}

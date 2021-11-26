package com.redtic.profile_ms.models;

import org.springframework.data.annotation.Id;
import java.util.Date;

public class Profile {
    @Id
    private String username;
    private String gender;
    private Date birthDate;
    private Integer cellphone;
    private String lastEducation;
    private String lastInstitution;

    public Profile(String username, String gender, Date birthDate,
                   Integer cellphone, String lastEducation,
                   String lastInstitution) {
        this.username = username;
        this.gender = gender;
        this.birthDate = birthDate;
        this.cellphone = cellphone;
        this.lastEducation = lastEducation;
        this.lastInstitution = lastInstitution;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getCellphone() {
        return cellphone;
    }

    public void setCellphone(Integer cellphone) {
        this.cellphone = cellphone;
    }

    public String getLastEducation() {
        return lastEducation;
    }

    public void setLastEducation(String lastEducation) {
        this.lastEducation = lastEducation;
    }

    public String getLastInstitution() {
        return lastInstitution;
    }

    public void setLastInstitution(String lastInstitution) {
        this.lastInstitution = lastInstitution;
    }
}

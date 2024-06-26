package com.smarthome.smarthomesystem.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_id_seq")
    private Long id;

    private String name;

    private Double temperature;

    private Double desiredTemperature;

    private Boolean isHvacWorking;

    private Boolean overrideZone;

    private Boolean hasMotionDetector;

    public void setHvacWorking(Boolean b) {
        isHvacWorking = b;
    }


    public Double getDesiredTemperature() {
        return desiredTemperature;
    }

    public void setDesiredTemperature(Double desiredTemperature) {
        this.desiredTemperature = desiredTemperature;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Boolean getIsHvacWorking() {
        return isHvacWorking;
    }

}

package com.smarthome.smarthomesystem.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "lights")
public class Light {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "light_id_seq")
    private Long id;

    private boolean isOn;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    private Room room;
}

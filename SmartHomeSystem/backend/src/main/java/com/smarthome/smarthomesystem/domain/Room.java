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

    @OneToMany(mappedBy = "room")
    private List<Window> windows;

    @OneToMany(mappedBy = "room")
    private List<Light> lights;

    @OneToMany(mappedBy = "room")
    private List<Door> doors;

}

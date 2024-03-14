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
@Table(name = "doors")
public class Door {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "door_id_seq")
    private Long id;

    private boolean isAutoLock;

    private boolean isOpen;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    private Room room;
}

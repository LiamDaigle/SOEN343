package com.smarthome.smarthomesystem.subject;

import com.smarthome.smarthomesystem.observer.Observer;
import com.smarthome.smarthomesystem.subject.SimulatorSubject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

public class SimulatorSubjectTest {

    @Mock
    private Observer observer1;

    @Mock
    private Observer observer2;

    private SimulatorSubject subject;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        subject = new SimulatorSubject();
    }

    @Test
    void testRegisterObserver() {

        subject.registerObserver(observer1);
        subject.registerObserver(observer2);

        assert(subject.getObservers().size() == 2);
    }

    @Test
    void testRemoveObserver() {

        subject.registerObserver(observer1);
        subject.registerObserver(observer2);


        subject.removeObserver(observer1);


        assert(subject.getObservers().size() == 1);
    }


    @Test
    void testSetAndGetTemperature() {

        Double temperature = 25.0;


        subject.setTemperature(temperature);

        assert(subject.getTemperature().equals(temperature));
    }

    @Test
    void testSetAndGetOutsideTemperature() {

        Double outsideTemperature = 15.0;


        subject.setOutsideTemperature(outsideTemperature);

        assert(subject.getOutsideTemperature().equals(outsideTemperature));
    }

}

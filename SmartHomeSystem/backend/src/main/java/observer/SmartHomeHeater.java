package observer;

import org.springframework.stereotype.Component;

@Component
public class SmartHomeHeater implements Observer {
    private String name;

    public SmartHomeHeater() {
    }

    @Override
    public void update(Double temperature) {
        System.out.println("Heater " + name + " temperature updated to: " + temperature);

        // Conditions 1: temperature outside is cooler than inside a zone or room
        //               if and only if the temperature outside is not lower than 20 C

        // Condition 2: If the windows are blocked by an arbitrary object

        // Condition 3: If the temperature inside the home is <= zero degrees
    }

    // Getter and setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

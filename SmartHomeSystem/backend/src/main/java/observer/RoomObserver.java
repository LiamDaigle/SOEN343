package observer;

public class RoomObserver implements Observer{
    private String name;
    private int temperature;

    public RoomObserver(String name, int temperature) {
        this.name = name;
        this.temperature = temperature;
    }

    public RoomObserver() {
    }

    @Override
    public void update(int temperature) {
        this.temperature = temperature;
        System.out.println("Room " + name + " updated to temperature: " + temperature);
    }
}

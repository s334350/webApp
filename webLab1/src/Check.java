public class Check {

    public static boolean checkPointInArea(float x, float y, float r) {
        return inCircle(x, y, r) || inTriangle(x, y, r) || inSquare(x, y, r);
    }

    //Проверка круга (нижняя левая четверть)
    public static boolean inCircle(float x, float y, float r){
        return (x <= 0 && y <= 0 && (x * x + y * y <= r * r));
    }

    //Проверка треугольника (верхняя левая часть)
    public static boolean inTriangle(float x, float y, float r){
        return (x <= 0 && y >= 0 && y <= x + r);
    }

    //Проверка квадрата (нижняя правая часть)
    public static boolean inSquare(float x, float y, float r){
        return (x >= 0 && y <= 0 && x <= (r / 2) && y >= (-r/2));
    }


}

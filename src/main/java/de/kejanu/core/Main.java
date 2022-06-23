package de.kejanu.core;

import io.quarkus.logging.Log;
import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;

@QuarkusMain
public class Main {

    public static void main(String... args) {
        Quarkus.run(StartUp.class, args);
    }

    public static class StartUp implements QuarkusApplication {

        @Override
        public int run(String... args) throws Exception {
            Log.info("Starting Application");
            Quarkus.waitForExit();
            return 0;
        }
    }
}

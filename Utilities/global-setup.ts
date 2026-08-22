import { chromium ,type FullConfig } from "@playwright/test";
import { POM } from "../tests/Ui/Pages/POM";
import {TEST_DATA} from "../test-Data/authData";
async function globalSetup(config: FullConfig) {
    
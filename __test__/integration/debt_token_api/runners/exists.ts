// External
import { BigNumber } from "utils/bignumber";

// Types
import { ScenarioRunner } from "./";
import { DebtTokenScenario } from "../scenarios";

export class ExistsScenarioRunner extends ScenarioRunner {
    public testScenario(scenario: DebtTokenScenario.ExistsScenario) {
        const { debtTokenAPI } = this.testAPIs;
        let tokenIDs: BigNumber[];

        describe(scenario.description, () => {
            beforeEach(async () => {
                if (scenario.shouldExist) {
                    tokenIDs = await Promise.all(
                        scenario.orders.map(this.generateDebtTokenForOrder),
                    );
                } else {
                    tokenIDs = await Promise.all(
                        scenario.orders.map(this.getDebtTokenIDFromUnfilledOrder),
                    );
                }
            });

            test("returns whether the token for a given id exists or not", async () => {
                for (let tokenID of tokenIDs) {
                    const exists = await debtTokenAPI.exists(tokenID);
                    if (scenario.shouldExist) {
                        expect(exists).toBeTruthy();
                    } else {
                        expect(exists).toBeFalsy();
                    }
                }
            });
        });
    }
}

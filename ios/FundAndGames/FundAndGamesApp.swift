import SwiftUI

@main
struct FundAndGamesApp: App {
    var body: some Scene {
        WindowGroup {
            WebGameView()
                .ignoresSafeArea(.container, edges: .bottom)
        }
    }
}

import SwiftUI
import WebKit

struct WebGameView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.allowsBackForwardNavigationGestures = false
        loadGame(in: webView)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    private func loadGame(in webView: WKWebView) {
        guard let resourceURL = Bundle.main.resourceURL else {
            return
        }

        let webRoot = resourceURL.appendingPathComponent("Web", isDirectory: true)
        let indexURL = webRoot.appendingPathComponent("index.html")
        webView.loadFileURL(indexURL, allowingReadAccessTo: webRoot)
    }
}

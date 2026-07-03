import json
import os
import re
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)))
SUBMISSIONS_FILE = os.path.join(DIRECTORY, "submissions.json")
ANFRAGEN_DIR = os.path.join(os.path.expanduser("~"), "Desktop", "anfragen")
PORT = 8899


def load_submissions():
    if not os.path.exists(SUBMISSIONS_FILE):
        return []
    with open(SUBMISSIONS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []


def save_submission(entry):
    submissions = load_submissions()
    submissions.append(entry)
    with open(SUBMISSIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(submissions, f, ensure_ascii=False, indent=2)
    write_request_file(entry)


def write_request_file(entry):
    os.makedirs(ANFRAGEN_DIR, exist_ok=True)

    received = entry["received_at"].replace(":", "-").split(".")[0]
    safe_name = re.sub(r"[^A-Za-z0-9_-]+", "_", entry.get("name") or "unbekannt").strip("_") or "unbekannt"
    filename = f"{received}_{safe_name}.txt"
    filepath = os.path.join(ANFRAGEN_DIR, filename)

    lines = [
        f"Eingegangen am: {entry['received_at']}",
        f"Typ: {entry.get('type', '')}",
        f"Name: {entry.get('name', '')}",
        f"E-Mail: {entry.get('email', '')}",
        f"Unternehmen: {entry.get('company', '')}",
        f"Interessensgebiet: {entry.get('interest', '')}",
        f"Kanal-Link: {entry.get('channel', '')}",
        "",
        "Nachricht:",
        entry.get("message", ""),
    ]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


class Handler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/submit":
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length)
        try:
            data = json.loads(raw_body)
        except json.JSONDecodeError:
            self.send_response(400)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b'{"error": "invalid json"}')
            return

        entry = {
            "received_at": datetime.now(timezone.utc).isoformat(),
            "type": data.get("type", ""),
            "name": data.get("name", ""),
            "email": data.get("email", ""),
            "company": data.get("company", ""),
            "interest": data.get("interest", ""),
            "channel": data.get("channel", ""),
            "message": data.get("message", ""),
        }
        save_submission(entry)

        self.send_response(200)
        self._set_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"status": "ok"}).encode("utf-8"))

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/submissions":
            self.send_response(200)
            self._set_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(load_submissions(), ensure_ascii=False, indent=2).encode("utf-8"))
            return
        self.send_response(404)
        self._set_cors_headers()
        self.end_headers()

    def log_message(self, format, *args):
        print("[form-server] " + (format % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Form server running on http://0.0.0.0:{PORT}")
    print(f"Submissions are saved to: {SUBMISSIONS_FILE}")
    server.serve_forever()

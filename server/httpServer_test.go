package main

import (
	"testing"
	"net/http/httptest"
	"net/http"
)

func TestHello(t *testing.T) {
	want := "hello"

	if got := ello(); got != want {
		t.Errorf("hello() = %q, want %q", got, want)
	}
}

func TestGetHello(t *testing.T) { 
	req, err := http.NewRequest("GET", "/hello", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(hello)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	// 	expected := `[{"id":1,"first_name":"Krish","last_name":"Bhanushali","email_address":"krishsb@g.com","phone_number":"0987654321"},{"id":2,"first_name":"xyz","last_name":"pqr","email_address":"xyz@pqr.com","phone_number":"1234567890"},{"id":6,"first_name":"FirstNameSample","last_name":"LastNameSample","email_address":"lr@gmail.com","phone_number":"1111111111"}]`
	expected := `{ "data" : "hello" }`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
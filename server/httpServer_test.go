package main

import "testing"

func TestHello(t *testing.T) {
	want := "hello"

	if got := ello(); got != want {
		t.Errorf("hello() = %q, want %q", got, want)
	}
}

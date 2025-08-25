package com.example.ecommerceadmin.util;

public final class DebugUtils {
  private DebugUtils() {}

  public static boolean looksLikeBcrypt(String s) {
    return s != null && s.startsWith("$2") && s.length() >= 50;
  }

  public static String preview(String s) {
    if (s == null) return "null";
    return "[" + s.replace("\n","\\n").replace("\r","\\r") + "] len=" + s.length();
  }
}

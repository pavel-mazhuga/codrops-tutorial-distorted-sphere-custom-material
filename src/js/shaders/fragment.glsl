varying float vPattern;

uniform vec3 uColor;

void main() {
    vec3 color = vPattern * uColor;

    csm_DiffuseColor = vec4(color, 1.);
}
